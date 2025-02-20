import { IonContent, IonList, IonPage, IonText } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "../components/Tabs/Tabs";
import './searchView.css';
import { EventCard } from "../components/EventCard/EventCard";
import { Pills } from "../components/Pills/Pills";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";

export enum SearchTabsEnum {
    EVENTS = "Eventos",
    ACCOUNTS = "Cuentas",
}

const dummyCategories = [
    {
        id: '1',
        label: 'Conciertos'
    },
    {
        id: '2',
        label: 'Música'
    },
    {
        id: '3',
        label: 'Música'
    },
    {
        id: '4',
        label: 'Música'
    },
    {
        id: '5',
        label: 'Música'
    },
    {
        id: '6',
        label: 'Música'
    }
]

const dummyUsers = [
    {
        id: '1',
        username: 'joe',
        profileImage: 'https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg'
    },
    {
        id: '2',
        username: 'joe',
        profileImage: 'https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg'
    },
    {
        id: '3',
        username: 'joe',
        profileImage: 'https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg'
    },
]

export function SearchView() {
    
    const [activeTab, setActiveTab] = useState<string>(SearchTabsEnum.EVENTS);
    const [search, setSearch] = useState('');
    const [events, setEvents] = useState([{
        id: '1',
    },
    {
        id: '2',
    },
    {
        id: '3',
    },
    
]);
    const [users, setUsers] = useState(dummyUsers);
    const [categories, setCategories] = useState(dummyCategories);
    const searchTabs = [
        {
            id: SearchTabsEnum.EVENTS,
            label: 'Eventos'
        },
        {
            id: SearchTabsEnum.ACCOUNTS,
            label: 'Usuarios'
        },
    ]
    useEffect(() => {
        // cargar las categories y el perfil
    }, []);

    
    return (
        <IonPage>
            <AppHeader />
            <IonContent>
                <div className="search-view-container">
                    <SearchBar value={search} onChange={setSearch} />
                    <Tabs tabs={searchTabs} onTabChange={(tab: Tab) => setActiveTab(tab.id)} />
                    {activeTab === SearchTabsEnum.EVENTS && (
                        <Pills pills={categories} />
                    )}
                </div>
                    {activeTab === SearchTabsEnum.EVENTS && (
                        <>
                            {events && search.length > 0 && (
                            <div className="events-content-container">
                                <IonList>
                                    {events.map((event: any) => (
                                        <EventCard 
                                        key={event.id}
                                        date='10/02/2021'
                                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
                                        eventId='1'
                                        eventImage='https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg'
                                        isLiked={true}
                                        profileImage='https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg'
                                        endsAt='8:00 pm'
                                        latitude='264554'
                                        category='CONCIERTO'
                                        username='joe'
                                        musicUrl='https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//EventsMusic.mp3'
                                        startsAt='6:00 pm'
                                        title='ESTE ES EL TITULO'
                                        handleLike={() => console.log("")}
                                        onShare={() => console.log("")}
                                        onComment={async() => console.log("")}
                                        onPressUser={() => console.log("")}
                                        onMoreDetails={() => console.log("")}   
                                        userComment={{
                                          username: 'joe',
                                          profileImage: 'https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg',
                                        }}
                                        fetchComments={() => Promise.resolve([])}
                                      />
                                    ))}
                                </IonList>
                            </div>
                            )}
                        </>
                    )}
                    {activeTab === SearchTabsEnum.ACCOUNTS && (
                        <>
                            {users && search.length > 0 && (
                                <div className="users-content-container">
                                    {
                                        users.map((user: any) => (
                                            <UserCard
                                                key={user.id}
                                                username={user.username}
                                                profileImage={user.profileImage}
                                                onPressButton={() => console.log("")}
                                                onPressUser={() => console.log("")}
                                            />
                                        ))
                                    }
                                </div>
                            )}
                        </>
                    )}
                
            </IonContent>
        </IonPage>
    )
}
