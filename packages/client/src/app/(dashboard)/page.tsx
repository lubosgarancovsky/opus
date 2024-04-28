import { Card, ProjectList, StoriesList } from '@/components';
import { Bookmark, Bug, Person } from '@/components/icons';

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <h3>Dashboard</h3>
      <div className="grid grid-cols-12 gap-8">
        <Card
          title="Manage projects"
          icon={
            <div className="bg-primary/20 text-primary p-2 w-fit rounded">
              <Person className="w-6" />
            </div>
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum massa a eros
          ultricies.
        </Card>
        <Card
          title="Invite collaborators"
          icon={
            <div className="bg-success/20 text-success p-2 w-fit rounded">
              <Person className="w-6" />
            </div>
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum massa a eros
          ultricies.
        </Card>
        <Card
          title="Create user stories"
          icon={
            <div className="bg-warning/20 text-warning p-2 w-fit rounded">
              <Bookmark className="w-6" />
            </div>
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum massa a eros
          ultricies.
        </Card>
        <Card
          title="Solve bugs"
          icon={
            <div className="bg-danger/20 text-danger p-2 w-fit rounded">
              <Bug className="w-6" />
            </div>
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum massa a eros
          ultricies.
        </Card>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <ProjectList />
        </div>
        <div className="col-span-4">
          <StoriesList />
        </div>
      </div>
    </main>
  );
}
