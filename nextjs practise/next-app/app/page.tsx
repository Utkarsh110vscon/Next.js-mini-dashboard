import UserTable from "./components/UserTable";

export default async function Home() {

  const response = await fetch('http://localhost:3001/getUserData', { cache: 'no-store' });
  const user = await response.json();

  // fetch('http://localhost:3001/').then((response) => {
  //   // console.log(response)
  //   return response.json()
  // }).then((data) => console.log(data));

  // console.log(user);

  return (
      <div className="bg-white h-[calc(100vh-68px)] flex justify-center py-10">
        <UserTable data={user.data} />
      </div>
  );
}
