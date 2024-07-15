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
import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  TabIndicator,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import { IoAdd } from "react-icons/io5";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ActiveFormSheetTab from "./components/ActiveFormSheetTab";
import ClosedFormSheetTab from "./components/ClosedFormSheetTab";
import DraftFormSheetTab from "./components/DraftFormSheetTab";
import RecentlyAddedFormSheetTab from "./components/RecentlyAddedFormSheetTab";

// Assets
export type FormsPageProps = {
  id?: string | null;
};

export default function FormsPage() {
  const { id } = useParams<FormsPageProps>(); // Retrieve the 'id' parameter from the URL
  const defaultTabIndex = parseInt(id, 10); // Convert 'id' to a number. Use 10 for the radix parameter to ensure it's parsed in base 10.

  // Check if the parsed 'id' is a valid number and within your tabs range
  const isValidTabIndex = !isNaN(defaultTabIndex) && defaultTabIndex >= 0; // Add more conditions if needed, e.g., defaultTabIndex < numberOfTabs

  // Chakra Color Mode
  const primaryColor = useColorModeValue("navy", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Flex
        flexDirection="column"
        gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
      >
        <Flex
          justifyContent="start"
          direction={{ base: "column", md: "row" }}
          align={{ base: "start", md: "center" }}
        >
          <Link
            href="/"
            mt={{
              base: "0px",
              md: "10px",
              lg: "0px",
              xl: "10px",
              "2xl": "0px",
            }}
          >
            <Button
              variant="darkBrand"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              leftIcon={
                <Icon transition="0.2s linear" w="20px" h="20px" as={IoAdd} />
              }
              px="24px"
              py="5px"
            >
              Buat Survey Baru
            </Button>
          </Link>
        </Flex>

        <Tabs
          mt="45px"
          colorScheme={primaryColor}
          defaultIndex={isValidTabIndex ? defaultTabIndex : 0}
        >
          <TabList>
            <Tab fontWeight="bold">Recently Added</Tab>
            <Tab fontWeight="bold">Active</Tab>
            <Tab fontWeight="bold">Closed</Tab>
            <Tab fontWeight="bold">Draft</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="3px"
            bg={primaryColor}
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <RecentlyAddedFormSheetTab />
            </TabPanel>
            <TabPanel>
              <ActiveFormSheetTab />
            </TabPanel>
            <TabPanel>
              <ClosedFormSheetTab />
            </TabPanel>
            <TabPanel>
              <DraftFormSheetTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      {/* Delete Product */}
    </Box>
  );
}
