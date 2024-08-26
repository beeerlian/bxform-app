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
import { Box, Flex, TabIndicator, useColorModeValue } from "@chakra-ui/react";

// Custom components

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ActiveFormSheetTab from "./components/ActiveFormSheetTab";
import ClosedFormSheetTab from "./components/ClosedFormSheetTab";
import CreateFormButton from "./components/CreateFormButton";
import DraftFormSheetTab from "./components/DraftFormSheetTab";
import RecentlyAddedFormSheetTab from "./components/RecentlyAddedFormSheetTab";

// Assets
export type FormsPageProps = {
  id?: string | null;
};

export default function FormsPage() {
  // Retrieve the 'id' parameter from the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const tabIndex = urlParams.get("tabIndex");
  const defaultTabIndex = parseInt(tabIndex, 10); // Convert 'id' to a number. Use 10 for the radix parameter to ensure it's parsed in base 10.

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
          <CreateFormButton />
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
          <TabIndicator height="3px" bg={primaryColor} borderRadius="1px" />
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
