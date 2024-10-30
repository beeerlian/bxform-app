// Chakra imports
import { useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import StateFailedUI from "components/state/StateFailed";
import StateLoadingUI from "components/state/StateLoading";
import { useParams } from "react-router-dom";
import { FORM_QUERIES } from "services/apollo/Operations/Client/Queries";
import { SurveyStatus } from "types/dto-types";
import { Forms } from "__generated__/graphql";
import FormAnalyticTab from "./components/FormAnalyticTab";
import FormSettingTab from "./components/FormSettingTab";
// Assets
import { z } from "zod";
import EditFormQuestionTab from "./components/EditQuestionTab";

const CreateQuestionSchema = z.object({
  topic: z.string().max(255).optional(),
  content: z.string(),
  caption: z.string().max(255).optional(),
  form_id: z.string().uuid(),
  question_type_id: z.string().uuid(),
  order: z.number().int(),
});

export type CreateQuestionSchemaType = z.infer<typeof CreateQuestionSchema>;

// Custom components
function FormDetailContent({ form, refetch }: { form: Forms, refetch: ()=> void }) {
  const primaryColor = useColorModeValue("navy", "white");
  const mainText = useColorModeValue("navy.700", "white");

  return (
    <Flex
      flexDirection="column"
      gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
    >
      <Text color={mainText} fontWeight="bold" fontSize="34px">
        {form?.title}
      </Text>

      <Tabs mt="45px" colorScheme={primaryColor}>

        <TabList>
          <Tab fontWeight="bold">Questions</Tab>
          {form.status != SurveyStatus.Draft ? (
            <Tab fontWeight="bold">Responses</Tab>
          ) : null}
          {form.status != SurveyStatus.Draft ? (
            <Tab fontWeight="bold">Analytic</Tab>
          ) : null}

          <Tab fontWeight="bold">Setting</Tab>
        </TabList>
        <TabIndicator height="3px" bg={primaryColor} borderRadius="1px" />
        <TabPanels>
          <TabPanel>
            {/* <FormQuestionTab questions={form.questions} /> */}
            <EditFormQuestionTab questions={form.questions} formId={form.id} onRefreshForm={refetch} />
          </TabPanel>
          {form.status != SurveyStatus.Draft ? <TabPanel></TabPanel> : null}
          {form.status != SurveyStatus.Draft ? (
            <TabPanel>
              <FormAnalyticTab />
            </TabPanel>
          ) : null}

          <TabPanel>
            <FormSettingTab form={form} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default function FormDetail() {
  // Chakra Color Mode
  const { id } = useParams<{ id: string }>();

  const { data, loading, error, refetch } = useQuery<{ forms_by_pk?: Forms }>(
    FORM_QUERIES.getById({ id })
  );

  function reFetchForm() {
    refetch();
  }

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {loading ? (
        <StateLoadingUI h="500px" />
      ) : error ? (
        <StateFailedUI error="message" h="500px" onRefresh={refetch} />
      ) : data ? (
        <FormDetailContent form={data.forms_by_pk} refetch={reFetchForm}  />
      ) : null}
    </Box>
  );
}
