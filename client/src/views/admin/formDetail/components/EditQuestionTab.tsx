import { useMutation, useQuery } from "@apollo/client";
import { Button, Flex, Skeleton, useDisclosure } from "@chakra-ui/react";
import StateFailedUI from "components/state/StateFailed";
import { useEffect } from "react";
import { QUESTION, QUESTION_TYPES } from "services/apollo/Operations/Client/Queries";
import AddQuestionCard from "views/admin/createForm/components/AddQuestionCard";
import { Questions, Question_Types } from "__generated__/graphql";
import AddQuestionModal from "./modals/AddQuestionModal";
import QuestionCard, { QuestionModeEnum } from "./questions/QuestionCard";



export default function EditFormQuestionTab({
  questions,
  formId,
  onRefreshForm,
}: {
  questions: Questions[];
  formId: string;
  onRefreshForm: () => void;
}) {
  const questionTypes = useQuery<{ question_types?: Question_Types[] }>(
    QUESTION_TYPES.getList()
  );

  const newQuestion: Questions[] = [];

  const [createQuestion, createQuestStatus] = useMutation<{
    insert_questions_one: { id: string };
  }>(QUESTION.createEmptyQuestion,  {
    variables: {
      formId: formId, 
      order: questions.length + 2, 
      question_type_id: questionTypes.data?.question_types ? questionTypes.data.question_types[0].id : 1
    },
  });


  const { isOpen, onOpen, onClose } = useDisclosure();

  

  const onButtonClick = () => {
  };

  const onAddNewQuestion = () => {
    // createQuestion();
    onOpen();
  };

  useEffect (() => {
    if(createQuestStatus.data){
      onRefreshForm();
      createQuestStatus.reset();
    }

  }, [createQuestStatus])

  return (
    <Flex direction="column" p={8}>
      {questions.length != 0 ? (
        <div>
          <Flex direction={"row"} justify="end" mb={"4"}>
            <Button
              variant={ "darkBrand"}
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="24px"
              py="5px"
              onClick={onButtonClick}
            >
              { "Save"}
            </Button>
          </Flex>
          {questions.map((question) => (
            <Skeleton isLoaded={!questionTypes.loading}>
              <QuestionCard
                question={question}
                mode={QuestionModeEnum.edit}
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

      <AddQuestionCard  mt={"6"} onClick={onAddNewQuestion} disabled={createQuestStatus.loading}/>
      <AddQuestionModal isOpen={isOpen} onClose={onClose} formId={formId} onRefreshForm={onRefreshForm}/>
    </Flex>
  );
}
