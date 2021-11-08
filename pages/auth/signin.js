import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import logoIG from "../../public/iglogo.svg";

import Image from "next/image";

export default function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-36 px-14 text-center">
        <Image src={logoIG} alt="" height={100} width={200} />
        <p className="font-xs italic">
          This in not a REAL Instagram App. <br />
          Just a project to get my coding skills up!
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white mb-5"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
