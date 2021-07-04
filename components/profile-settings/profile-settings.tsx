import { type } from "os"
import styles from "./profile-settings.module.css"

type profilePicturesParameters = {
    profilePictureImageSrc?: string
}

export default function ProfileSettings({ profilePictureImageSrc }: profilePicturesParameters) {
    return (
        <div className={`${styles['profile-settings-container']}`}>
            <img className={`${styles['profile-picture']}`} alt="profile picture" src={profilePictureImageSrc || "TODO-random-profile-image"} />
            {/*upload image */}
        </div>
    )
}