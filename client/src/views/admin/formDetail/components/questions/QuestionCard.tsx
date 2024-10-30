import { useMutation } from "@apollo/client";
import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { QUESTION } from "services/apollo/Operations/Client/Queries";
import { Questions, Question_Types } from "__generated__/graphql";
import QuestionInput from "../input/QuestionInput";



export enum QuestionModeEnum {
  edit,
  view,
}

export interface IQuestionFormFields {
      caption : string
      topic: string
      content: string
      order?: number
      option? : any
      question_type_id : number
}


export default function QuestionCard({
  question,
  questionTypes = [],
  mode,
}: {
  question: Questions;
  questionTypes: Question_Types[];
  mode: QuestionModeEnum;
}) {
  const tertiaryColor = useColorModeValue("white", "brand.500");
  const textColor = useColorModeValue("brand.500", "white");
  const brandColor = useColorModeValue("brand.500", "white");

  const disabled = mode === QuestionModeEnum.view;

  const [formValues, setFormValues] = useState<IQuestionFormFields>({
    caption: question.caption,
    topic: question.topic,
    content: question.content,
    order: question.order,
    option: question.option,
    question_type_id: question.question_type_id,
  });
  
  const [selectedQuestionType, setSelectedQuestionType] = useState<Question_Types>(null);

  const { register, handleSubmit } = useForm<IQuestionFormFields>(
    {
      defaultValues: {
        caption : question.caption,
        topic: question.topic,
        content: question.content,
        question_type_id : question.question_type_id 
      }
    }
  )
  // const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)


  const [update, updateState] = useMutation<{
    update_questions_by_pk: { id: string };
  }>(QUESTION.updateQuestionByPk,  {
    variables: {
      id : question.id,
      caption : question.caption,
      topic: question.topic,
      content: question.content,
      order: question.order,
      option: question.option,
      question_type_id : question.question_type_id 
    },
  });

  const updateQuestin = () => {
    setTimeout(() => {
    }, 2000);
  }


  useEffect(() => {
    if(formValues.question_type_id){
      const found = questionTypes.find((q) => q.id == formValues.question_type_id);
      if(found){
        setSelectedQuestionType(found);
        console.log("found", found);
        console.log("found id", question.question_type_id);
      }
    }
  }, [formValues]);
  
  useEffect(() => {
    const found = questionTypes.find((q) => q.id === question.question_type_id);
    if(found){
      setSelectedQuestionType(found);
    }
  }, []);

  const onQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("onchange : "+ parseInt(e.target.value))
    setFormValues({
      ...formValues,
      question_type_id: parseInt(e.target.value)
    })
  }

  return (
    <Flex direction="row" 
    px={{ base: "0px", "2xl": "10px" }}
        w="100%"
    >
    <Card py="15px" mb={"24px"}>
      <Flex
        
        justifyContent="space-between"
        alignItems="center"
        mb="8px"
      >
        <Flex direction="column">
          <Text fontSize="small" fontWeight="400">
            Aspek yang ingin dinilai
          </Text>
          <InputField
            id="topic"
            placeholder="Enter topic"
            type="text"
            name="topic"
            disabled={disabled}
            p="10px"
            // onChange={(e: any) => setFormValues({ ...formValues, topic: e.target.value })}
            register={register}
          />
        </Flex>
      
        <Select
          fontSize="small"
          disabled={disabled}
          maxW={{ base: "30%", "2xl": "200px", md: "50%" }}
          variant="subtitle"
          defaultValue={question.question_type.code}
          backgroundColor={brandColor}
          width="unset"
          icon={!disabled && <ChevronDownIcon />}
          color={tertiaryColor}
          // onChange={onQuestionTypeChange}
          fontWeight="700"
        
        >
          {questionTypes.map((type) => (
            <option key={type.code} value={type.id}>
              {type.name}
            </option>
          ))}
        </Select>
      </Flex>
      <InputField
            id="content"
            placeholder="Masukan pertanyaan"
            label={!disabled ? "Pertanyaan" : null}
            type="text"
            name="content"
            fontSize="md"
            disabled={disabled}
            as="textarea"
            resize="vertical"
            maxH={null}
            h="unset"
            // border="none"
            p="10px"
            fontWeight="600"
            // mt="2px"
            register={register}
            // onChange={(e: any) => setFormValues({ ...formValues, caption: e.target.value })}
          />
      {/* <Text fontSize="md" fontWeight="600" mt="2px">
        {question.content}
      </Text> */}
      <br />
      <QuestionInput questionId={question.id} questionType={selectedQuestionType} disabled={disabled} />
      <br />
      <InputField
            id="caption"
            label={!disabled ? "Deskripsi pertanyaan" : null}
            placeholder="Tambahkan deksripsi pertanyaan"
            type="text"
            name="caption"
            fontSize="sm"
            disabled={disabled}
            register={register}
            // onChange={(e: any) => setFormValues({ ...formValues, caption: e.target.value })}
          />
      <Text fontSize="small" fontWeight="300" mt="2px" color="secondary">
        {question.caption}
      </Text>
    </Card>
    {(mode === QuestionModeEnum.edit) ? <Flex 
    marginLeft="6px"
    direction="column">

      <Button
        colorScheme="red"
        onClick={() => {
          // Handle remove logic here
        }}
        marginBottom="10px"
      >
      <FaTrash />  
      </Button>
      <Button
        colorScheme="blue"
        onClick={() => {
          // Handle edit logic here
          updateQuestin();
        }}
      >
        <EditIcon />  
      </Button>
    </Flex> : null}
    </Flex>
  );
}
