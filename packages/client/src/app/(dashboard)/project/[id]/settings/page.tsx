import { SettingsDetail, SettingsCollabs, SettingsRequests } from '@/components';

const ProjectSettings = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col gap-16">
      <SettingsDetail id={params.id} />
      <SettingsCollabs id={params.id} />
      <SettingsRequests id={params.id} />
    </div>
  );
};

export default ProjectSettings;
