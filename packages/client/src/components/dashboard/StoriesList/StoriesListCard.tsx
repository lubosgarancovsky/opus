import { Bookmark, Bug } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Story, trunctate } from '@/utils';

export const StoriesListCard = ({ story }: { story: Story }) => {
  const Icon = () =>
    story.type === 'bug' ? <Bug className="w-5" /> : <Bookmark className="w-5" />;
  return (
    <div
      key={story.id}
      className={'rounded-xl bg-slate-200 text-slate-60 w-[24rem] flex flex-col gap-4 p-4 h-full'}
    >
      <div className="text-slate-600 flex justify-between">
        <div className="bg-slate-300 p-3 rounded-full w-fit">
          <Icon />
        </div>
        <Badge className="bg-slate-600 h-fit">{story.code}</Badge>
      </div>
      <div>
        <b>{story.title}</b>
        <p className="mt-2 font-medium text-slate-500">{trunctate(story.description, 120)}</p>
      </div>
    </div>
  );
};
