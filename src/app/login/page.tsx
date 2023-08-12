import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/app/components/Login"), {
  ssr: true,
  loading: () => <div>loading...</div>
});

export default function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}
