import { redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {  // through request object, we get access to the form data that was submitted
  const searchParams = new URL(request.url).searchParams;   //we can't use useParams here cause we can't use hooks... the URL is built in // find out more
  const mode = searchParams.get('mode') || 'login';   ///if mode not found, it defaults to login -- check the answer to your question, "initial and current login..."

  if (mode !== 'login' && mode !== 'signup') {
    throw new Response(JSON.stringify({ message: 'Unsupported mode.' }), {  // acc to max, we should throw responses here instead of regular objects because --- vd 368. IDG like mad
      status: 422,
    });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:8080/' + mode, {  //This also handles the login -- 391 // ask chat
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData)
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not authenticate user.' }), {  // acc to max, we should throw responses here instead of regular objects because --- vd 368. IDG like mad
      status: 422,
    });
  }

  const resData = await response.json();  // the response data also cointains a token and we're extracting it below.
  const token = resData.token; 

  localStorage.setItem('token', token); // 392 //this where we store the token
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);   //398   // chatgpt and practice 
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}