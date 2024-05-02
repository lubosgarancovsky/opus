import { InvitesList, ProjectList, StoriesList } from '@/components';

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <h2>Dashboard</h2>
      <div className="flex flex-col gap-8">
        <StoriesList />
        <ProjectList />
        <InvitesList />
      </div>
    </main>
  );
}
