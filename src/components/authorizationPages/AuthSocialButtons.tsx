import toast from "react-hot-toast"

const notifyPrototype = () => toast("Авторизация будет подключена позже.")

export const AuthSocialButtons = () => (
    <div className="auth-social-buttons" aria-label="Другие способы авторизации">
        <button type="button" onClick={notifyPrototype}><span className="auth-social-icon auth-social-icon--vk">VK</span>Войти через VK</button>
        <button type="button" onClick={notifyPrototype}><span className="auth-social-icon auth-social-icon--ya">Я</span>Войти через Яндекс</button>
    </div>
)
