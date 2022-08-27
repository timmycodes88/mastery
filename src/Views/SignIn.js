import tw from 'twin.macro';
import { useState } from 'react';
import { createAnAccount, signInWithEmail, signInWithGoogle } from '../Firebase/FirebaseConfig'

export default function SignIn() {

    const [isSignIn, setIsSignIn] = useState(true);

    // Text Fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    return (
        <>
            <FullScreenBackground />
            <SignInWrapper>
                <Title>{isSignIn ? 'Sign In Friend!' : 'Create Account!'}</Title>
                <FormWrapper>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your Email' />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your Password' />
                    {isSignIn ? null : <Input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="password" placeholder='Re-enter your Password' />}
                    <ButtonWrapper>
                        <SignInButton onClick={isSignIn ? signInWithEmail : createAnAccount}>{isSignIn ? 'Sign In' : 'Create an Account'}</SignInButton>
                        <SignInWithGoogle onClick={signInWithGoogle}>Sign In w Google</SignInWithGoogle>
                    </ButtonWrapper>
                </FormWrapper>
                <SwitchToCreateButton onClick={() => setIsSignIn((oldState) => !oldState)}>
                    {isSignIn ? 'Create an Account' : 'Already have account? Sign In'}
                </SwitchToCreateButton>
            </SignInWrapper>
        </>
    )
}

const FullScreenBackground = tw.div`absolute z-[-100] top-0 left-0 right-0 bottom-0 bg-gray-100`;
const SignInWrapper = tw.div`bg-white border border-gray-300 rounded-lg shadow-lg m-auto p-12 mt-20 w-1/2 xl:w-1/3`;
const Title = tw.h1`text-5xl text-center underline`;
const FormWrapper = tw.div`m-auto my-4`;
const Input = tw.input`block w-full p-2 rounded border border-gray-200 outline-none focus:border-blue-500 my-2`;
const ButtonWrapper = tw.div`flex justify-around`
const Button = tw.button`py-3 px-3 m-3 w-1/2  rounded-sm`;
const SignInButton = tw(Button)`bg-green-600 text-white`;
const SignInWithGoogle = tw(Button)`bg-blue-600 text-white`;
const SwitchToCreateButton = tw(Button)`block m-auto text-blue-500`
