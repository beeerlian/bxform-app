import { useQuery } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useColorModeValue } from "@chakra-ui/react";
import InputField from "components/fields/InputField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { QUESTION_TYPES } from "services/apollo/Operations/Client/Queries";
import { Question_Types } from "__generated__/graphql";
import QuestionInput from "../input/QuestionInput";
import { IQuestionFormFields } from "../questions/QuestionCard";


export default function AddQuestionModal(
  {
    isOpen,
    onClose,
    formId,
    onRefreshForm,
  }: {
    isOpen: boolean;
    onClose: () => void;
    formId: string;
    onRefreshForm: () => void;
  }
) {
  
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const questionTypes = useQuery<{ question_types?: Question_Types[] }>(
    QUESTION_TYPES.getList()
  );

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah pertanyaan</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6}>

          {
            questionTypes.data?.question_types ? 
            <AddQuestionModalBody questionTypes={questionTypes.data.question_types} formId={formId} onRefreshForm={() => {}} /> 
            : <Text>Loading...</Text>
          }
          
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  );
}

function AddQuestionModalBody(
  {
    questionTypes,
    formId,
    onRefreshForm,
  }: {
    formId: string;
    questionTypes: Question_Types[];
    onRefreshForm: () => void;
  }
) {
  

  const { register, handleSubmit } = useForm<IQuestionFormFields>(
    {
      defaultValues: {
        caption :null,
        topic:null,
        content:null,
        question_type_id :null,
      }
    }
  )

  const [formValues, setFormValues] = useState<IQuestionFormFields>({
    caption: null,
    topic: null,
    content: null,
    order: null,
    option: null,
    question_type_id: null,
  });
  
 

  const tertiaryColor = useColorModeValue("white", "brand.500");
  const textColor = useColorModeValue("brand.500", "white");
  const brandColor = useColorModeValue("brand.500", "white");


  const onQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      question_type_id: parseInt(e.target.value)
    })
  }

  

  return (
    <>
      
          <Flex
        
        justifyContent="space-between"
        alignItems="center"
        mb="8px"
      >
        <Flex direction="column">
          
          <InputField
            id="topic"
            placeholder="Enter topic"
            type="text"
            name="topic"
            label="Aspek yang ingin dinilai"  
            p="10px"
            // onChange={(e: any) => setFormValues({ ...formValues, topic: e.target.value })}
            register={register}
          />
        </Flex>
  
        <Select
          fontSize="small"
          maxW={{ base: "30%", "2xl": "200px", md: "50%" }}
          variant="subtitle"
          backgroundColor={brandColor}
          width="unset"
          icon={<ChevronDownIcon />}
          color={tertiaryColor}
          onChange={onQuestionTypeChange}
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
            label={"Pertanyaan"}
            type="text"
            name="content"
            fontSize="md"
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
      <Text ms='10px' fontSize="sm">Isian</Text>
      <QuestionInput  questionType={questionTypes.find((e)=> e.id === formValues.question_type_id)} mb='18px'/>
    
      <InputField
            id="caption"
            label={"Deskripsi pertanyaan"}
            placeholder="Tambahkan deksripsi pertanyaan"
            type="text"
            name="caption"
            maxH={null}
            h="unset"
            as="textarea"
            fontSize="sm"
            register={register}
            // onChange={(e: any) => setFormValues({ ...formValues, caption: e.target.value })}
          />
      <ModalFooter>
            <Button>
              Save
            </Button>
      </ModalFooter>
    </>
  );
}