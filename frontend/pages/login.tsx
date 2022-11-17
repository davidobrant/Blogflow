import Head from "next/head";
import LoginForm from "../components/LoginForm/LoginForm";

const login = () => {

    return ( 
        <>
        <Head>
            <title>Blogflow | Login</title>
        </Head>
        
        <div className="container">
            <LoginForm />
        </div>
        </>
     );
}
 
export default login;