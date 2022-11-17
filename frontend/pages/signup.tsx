import Head from 'next/head';
import RegisterForm from '../components/RegisterForm/RegisterForm'

const signup = () => {

    return ( 
        <>
        <Head>
            <title>Blogflow | Register</title>
        </Head>
        
        <div className="container">
            <RegisterForm />
        </div>
        </>
     );
}
 
export default signup;