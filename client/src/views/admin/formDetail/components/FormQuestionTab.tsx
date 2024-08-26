import { useQuery } from "@apollo/client";
import { Button, Flex, Skeleton } from "@chakra-ui/react";
import StateFailedUI from "components/state/StateFailed";
import { useState } from "react";
import { QUESTION_TYPES } from "services/apollo/Operations/Client/Queries";
import AddQuestionCard from "views/admin/createForm/components/AddQuestionCard";
import { Questions, Question_Types } from "__generated__/graphql";
import QuestionCard, { QuestionModeEnum } from "./questions/QuestionCard";



export default function FormQuestionTab({
  questions,
}: {
  questions: Questions[];
}) {
  const [mode, setMode] = useState<QuestionModeEnum>(QuestionModeEnum.view);
  const questionTypes = useQuery<{ question_types?: Question_Types[] }>(
    QUESTION_TYPES.getList()
  );

  const onSave = () => {
    setMode(QuestionModeEnum.view);
  };
  const onEdit = () => {
    setMode(QuestionModeEnum.edit);
  };

  const onButtonClick = () => {
    if (mode == QuestionModeEnum.edit) {
      onSave();
    } else {
      onEdit();
    }
  };

  return (
    <Flex direction="column" p={8}>
      {questions.length != 0 ? (
        <div>
          <Flex direction={"row"} justify="end" mb={"4"}>
            <Button
              variant={mode == QuestionModeEnum.edit ? "darkBrand" : "outline"}
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="24px"
              py="5px"
              onClick={onButtonClick}
            >
              {mode == QuestionModeEnum.edit ? "Save" : "Edit"}
            </Button>
          </Flex>
          {questions.map((question) => (
            <Skeleton isLoaded={!questionTypes.loading}>
              <QuestionCard
                question={question}
                mode={mode}
                questionTypes={questionTypes.data?.question_types}
              />
            </Skeleton>
          ))}
        </div>
      ) : (
        <div>
          <StateFailedUI
            title=""
            error={"Anda belum menambahkan pertanyaan"}
            actionChild={<AddQuestionCard mt={"24px"} />}
          />
        </div>
      )}
    </Flex>
  );
}
