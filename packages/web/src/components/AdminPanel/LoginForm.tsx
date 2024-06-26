import { Form } from "react-router-dom";

export default function LoginForm() {
    return (
        <>
            <Form action="">
                <label htmlFor="username">
                    Login: <input type="text" id="username" />
                </label>
                <label htmlFor="password">
                    Hasło: <input type="text" id="password" />
                </label>
                <button type="submit">Zaloguj się</button>
            </Form>
        </>
    );
}