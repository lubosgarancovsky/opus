import { LoginForm } from '@/components';
const LoginPage: React.FC = () => {
  return (
    <main>
      <div className="grid grid-cols-3 p-16 gap-16 min-h-screen">
        <div className="bg-blue-500 rounded-xl col-span-2"></div>
        <div className="w-[24rem] mx-auto grid place-items-center">
          <div className="w-full">
            <h1>
              Sign <span className="text-blue-500">in</span>
            </h1>
            <p>Log in to your account</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
