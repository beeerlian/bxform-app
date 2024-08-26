/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { useQuery } from "@apollo/client";
import { Flex, useColorModeValue, useToast } from "@chakra-ui/react";
import React from "react";
import { QUESTION_TYPES } from "services/apollo/Operations/Client/Queries";
import { Questions, Question_Types } from "__generated__/graphql";
import AddQuestionCard from "./AddQuestionCard";
import CreateQuestionCard from "./CreateQuestionCard";

// Custom components

// Assets

export default function CreateQuestionTab() {
  // Chakra Color Mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");

  // External
  const toast = useToast();

  // State
  const [questions, setQuestion] = React.useState<Questions[]>([]);

  // Queries
  const questionTypes = useQuery<{ question_types?: Question_Types[] }>(
    QUESTION_TYPES.getList()
  );

  const addQuestion = (data: Questions) => {
    setQuestion([...questions, data]);
  };
  const removeQuestion = (index: number) => {
    setQuestion(questions.filter((_, i) => i !== index));
  };

  const reOrderQuestion = ({
    data,
    from,
    to,
  }: {
    data: Questions;
    from: number;
    to: number;
  }) => {
    const newQuestions = [...questions];
    newQuestions.splice(from, 1);
    newQuestions.splice(to, 0, data);
    setQuestion(newQuestions);
  };

  return (
    <Flex direction="column">
      {questions.map((question, index) => (
        <CreateQuestionCard
          question={question}
          questionTypes={questionTypes.data.question_types ?? []}
        />
      ))}
      <AddQuestionCard onClick={()=> {
        // addQuestion()
      }} />
    </Flex>
  );
}
