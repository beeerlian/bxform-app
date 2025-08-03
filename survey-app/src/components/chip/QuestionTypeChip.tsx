import { OptionType } from '@/types/dto-types';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: OptionType;
}

const QuestionTypeChip: React.FC<Props> = ({ type, ...rest }) => {
  return (
    <div {...rest}>
      <div className="flex items-center justify-center px-2 rounded bg-blue-100 text-blue-500 text-xs">
        {type}
      </div>
    </div>
  );
};

export default QuestionTypeChip;
