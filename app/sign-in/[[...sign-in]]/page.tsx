import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <SignIn appearance={{
        elements: {
          formButtonPrimary: "bg-green-600 hover:bg-green-700",
          footerActionLink: "text-green-600 hover:text-green-700"
        }
      }} />
    </div>
  );
}
