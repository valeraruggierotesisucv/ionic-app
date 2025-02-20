import { IonContent, IonList, IonPage } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory } from "react-router-dom";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";
import { useState } from "react";

export function FollowersView() {
    const history = useHistory();
    const [search, setSearch] = useState("");
    const [followers, setFollowers] = useState([{
        username: "john doe",
        profileImage: "https://www.lanacion.com.ar/resizer/v2/neytit-HR4VC2VABNE3JA3AC43J7ZYVTA.jpg?auth=3c0b29056707f21fbb4de307edc27e30b3f0526333c9e66dc1875311b3f04ef4&width=420&height=630&quality=70&smart=true"
    }, {
        username: "john doe",
        profileImage: "https://www.lanacion.com.ar/resizer/v2/neytit-HR4VC2VABNE3JA3AC43J7ZYVTA.jpg?auth=3c0b29056707f21fbb4de307edc27e30b3f0526333c9e66dc1875311b3f04ef4&width=420&height=630&quality=70&smart=true"
    }]);
    return (
        <IonPage>
            <AppHeader title="Seguidores" goBack={() => history.goBack()}/>
            <IonContent className="ion-padding">
                <SearchBar
                    placeholder="Buscar seguidores"
                    onChange={setSearch}
                    value={search}
                />
                <IonList>
                    {followers.map((follower) => (
                        <UserCard
                            username={follower.username}
                            variant={UserCardVariant.WITH_BUTTON}
                        profileImage="https://www.lanacion.com.ar/resizer/v2/neytit-HR4VC2VABNE3JA3AC43J7ZYVTA.jpg?auth=3c0b29056707f21fbb4de307edc27e30b3f0526333c9e66dc1875311b3f04ef4&width=420&height=630&quality=70&smart=true"
                        />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}
