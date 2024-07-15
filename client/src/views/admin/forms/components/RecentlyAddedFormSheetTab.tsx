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
import { Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

// Custom components
import FormSheetCard from "components/card/FormSheetCard";
import { SurveyStatus } from "types/dto-types";

// Assets

export default function RecentlyAddedFormSheetTab() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  
  return (
    <Flex direction="column">
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
        {Array.from({ length: 9 }).map((_, index) => (
          <FormSheetCard
            key={index}
            title="Survey Kepuasan Mahasiswa Teknik Informatika"
            category="Education"
            endDate="2022-12-31 12:00"
            startDate="2022-12-31 00:00"
            status={SurveyStatus.Active}
            totalResponse={100}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
