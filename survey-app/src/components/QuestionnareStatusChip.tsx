import { QuissionareStatus } from '@/types/dto-types';
import { quissionareStatusToString } from '@/utils/quissionare.util';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  status: QuissionareStatus;
}

const QuestionnareStatusChip: React.FC<Props> = ({ status, ...rest }) => {
  return (
    <div {...rest}>
      <div className="w-fit items-center justify-center px-2 py-1 rounded bg-green-100 text-green-500 font-semibold text-sm">
        {quissionareStatusToString(status)}
      </div>
    </div>
  );
};

export default QuestionnareStatusChip;
