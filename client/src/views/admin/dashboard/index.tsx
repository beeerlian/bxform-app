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
  Flex,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import FormSheetCard from "components/card/FormSheetCard";
import { SurveyStatus } from "types/dto-types";

// Assets

export default function Dashboard() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Flex
        flexDirection="column"
        gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
      >
        <Flex direction="column">
          <Flex
            mt="45px"
            mb="20px"
            justifyContent="space-between"
            direction={{ base: "column", md: "row" }}
            align={{ base: "start", md: "center" }}
          >
            <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
              Your Active Sheets
            </Text>
            <Flex
              align="center"
              me="20px"
              ms={{ base: "24px", md: "0px" }}
              mt={{ base: "20px", md: "0px" }}
            >
              <Link
                color={textColorBrand}
                fontWeight="500"
                href={`/admin/form-sheets/${1}`}
              >
                See More
              </Link>
            </Flex>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
            <FormSheetCard
              title="Survey Kepuasan Mahasiswa Teknik Informatika"
              category="Education"
              endDate="2022-12-31 12:00"
              startDate="2022-12-31 00:00"
              status={SurveyStatus.Active}
              totalResponse={100}
            />
            <FormSheetCard
              title="Survey Kepuasan Mahasiswa Teknik Informatika"
              category="Education"
              endDate="2022-12-31 12:00"
              startDate="2022-12-31 00:00"
              status={SurveyStatus.Active}
              totalResponse={100}
            />
            <FormSheetCard
              title="Survey Kepuasan Mahasiswa Teknik Informatika"
              category="Education"
              endDate="2022-12-31 12:00"
              startDate="2022-12-31 00:00"
              status={SurveyStatus.Active}
              totalResponse={100}
            />
          </SimpleGrid>
          <Flex
            mt="45px"
            mb="20px"
            justifyContent="space-between"
            direction={{ base: "column", md: "row" }}
            align={{ base: "start", md: "center" }}
          >
            <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
              Recently Added
            </Text>
            <Flex
              align="center"
              me="20px"
              ms={{ base: "24px", md: "0px" }}
              mt={{ base: "20px", md: "0px" }}
            >
              <Link color={textColorBrand} fontWeight="500" href="#sports">
                See More
              </Link>
            </Flex>
          </Flex>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap="20px"
            mb={{ base: "20px", xl: "0px" }}
          >
            <FormSheetCard
              title="Survey Kepuasan Mahasiswa Teknik Informatika"
              category="Education"
              endDate="2022-12-31 12:00"
              startDate="2022-12-31 00:00"
              status={SurveyStatus.Active}
              totalResponse={100}
            />
            <FormSheetCard
              title="Survey Kepuasan Mahasiswa Teknik Informatika"
              category="Education"
              endDate="2022-12-31 12:00"
              startDate="2022-12-31 00:00"
              status={SurveyStatus.Active}
              totalResponse={100}
            />
            <FormSheetCard
              title="Survey Kepuasan Mahasiswa Teknik Informatika"
              category="Education"
              endDate="2022-12-31 12:00"
              startDate="2022-12-31 00:00"
              status={SurveyStatus.Active}
              totalResponse={100}
            />
          </SimpleGrid>
        </Flex>
      </Flex>
      {/* Delete Product */}
    </Box>
  );
}
