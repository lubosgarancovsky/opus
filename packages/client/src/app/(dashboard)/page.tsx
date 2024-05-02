import { InvitesList, ProjectList, StoriesList, Welcome } from '@/components';

export default function Home() {
  return (
    <main className="flex flex-col gap-16">
      <Welcome />

      <div className="flex flex-col gap-24 ">
        <StoriesList />
        <div className="grid grid-cols-2 gap-24">
          <ProjectList />
          <InvitesList />
        </div>
      </div>
    </main>
  );
}
