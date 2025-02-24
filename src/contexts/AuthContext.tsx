import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { supabase } from "../supabaseClient"; 

import { AuthUser, Session } from '@supabase/supabase-js';


interface AuthContextType {
    user: AuthUser | null;
    session: Session | null;
    login: (email:string, password: string) => Promise<{error?: string}>;
    logout: () => void;
    resetPassword: (email:string) => void;
    signup: (email:string, password: string, fullname: string, username: string) => Promise<{user: AuthUser | null, error?: string}>;
    updatePassword: (password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);

    const signup = async(email: string, password: string, fullname: string, username: string) => {
        try {
            const { error, data } = await supabase.auth.signUp({
                email: email, 
                password: password,
                options: {
                    data: {
                        full_name: fullname,
                        username: username,           
                    }
                }
            });

            if(error) {
                return { user: null, error: error.message };
            }

            setUser(data.user);
            setSession(data.session);
            return { user: data.user, error: undefined };
        } catch (error: any) {
            console.error("Error signing up:", error);
            return { user: null, error: "Error al registrarse. Por favor, inténtalo de nuevo." };
        }
    }

    const login = async(email: string, password: string) => {
        try {
            const response = await supabase.auth.signInWithPassword({
                email: email, 
                password: password
            });

            if(response.error) {
                return { error: response.error.message };
            }

            setUser(response.data.user);
            setSession(response.data.session);
            return { error: undefined };
        } catch (error: any) {
            console.error("Error logging in:", error);
            return { error: "Error al iniciar sesión. Por favor, inténtalo de nuevo." };
        }
    };

    const updatePassword = async(password: string) => {
        const { error } = await supabase.auth.updateUser({ password: password })
        if (error) console.log(error.message)
    }

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out:', error.message);
                return;
            }
            setUser(null);
            setSession(null);
        } catch (error: any) {
            console.error('Error during logout:', error.message);
        }
    };

    const resetPassword = async(email:string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
        console.log("email", email); 
        console.log(data); 
        if(error) console.log(error.message); 
    }

    useEffect(() => {
        const loadSession = async () => {
            try {
                //await SplashScreen.preventAutoHideAsync();
                const { data: sessionData } = await supabase.auth.getSession();
                setSession(sessionData.session);
                setUser(sessionData.session?.user || null);
                //await SplashScreen.hideAsync();
            } catch (error) {
                console.error("Error preventing auto-hide of splash screen:", error);
            } finally {
                //await SplashScreen.hideAsync();
            }
        };
        loadSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session);
                setUser(session?.user || null);
            }
        );
        return () => {
            authListener?.subscription.unsubscribe();
        };  
    }, []);

    return (
        <AuthContext.Provider value={{ user, session, login, logout, resetPassword, signup, updatePassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}