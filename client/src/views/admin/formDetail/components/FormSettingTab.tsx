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
import { useMutation } from "@apollo/client";
import { CopyIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Switch,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { FORM_MUTATIONS } from "services/apollo/Operations/Client/Mutations";
import { date, z } from "zod";
import { Forms } from "__generated__/graphql";

// Zod Schema
const CreateFormSchema = z.object({
  title: z.string().min(1).max(255),
  password: z.string().min(3).max(20).optional(),
  target_audience: z.number().int().min(1).optional(),
  end_date: z.string().datetime({ offset: true }).optional(),
  start_date: z.string().datetime({ offset: true }).optional(),
  usePassword: z.boolean().default(false),
});

export type CreateFormSchemaType = z.infer<typeof CreateFormSchema>;

// Assets

export default function FormSettingTab({ form }: { form: Forms }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const formLinkRef = useRef(null);
  const [show, setShow] = React.useState(false);
  const [usePassword, setUsePassword] = React.useState(false);
  const toast = useToast();

  // Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormSchemaType>();

  const [updateFormSettings, updateFormState] = useMutation(
    FORM_MUTATIONS.updateFormSettings
  );

  const onSubmit = async (data: CreateFormSchemaType) => {
    var variables = {
      id: form.id,
      ...data,
    };
    delete variables.usePassword;
    updateFormSettings({ variables });
    console.log("SUCCESS", data);
  };

  useEffect(() => {
    if (updateFormState.data) {
      toast({
        title: "Success",
        description: "Form updated successfully",
        status: "success",
        duration: 1000,
      });
    } else if (updateFormState.error) {
      toast({
        title: "Failed",
        description: updateFormState.error.message,
        status: "error",
        duration: 1000,
      });
    }
  }, [updateFormState.data, updateFormState.error]);

  // State
  const handleClick = () => setShow(!show);
  const copyToClipboard = (e: any) => {
    navigator.clipboard.writeText(form.public_id);
    toast({
      title: "Copied to clipboard",
      description: "You've successfully copied the form link",
      status: "success",
      duration: 1000,
    });
  };
  return (
    <Flex direction="column" maxW="1000px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
            <FormInputUI
              form={form}
              {...register("title")}
              errors={errors.title}
              isRequired={true}
              variant="auth"
              defaultValue={form.title}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Title"
              mb="24px"
              color={textColor}
              fontWeight="500"
              size="lg"
            />
            <div>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Title<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                {...register("title")}
                isRequired={true}
                variant="auth"
                defaultValue={form.title}
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Title"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
            </div>
            <div>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Target Audience
              </FormLabel>
              <Input
                {...register("target_audience")}
                isRequired={true}
                variant="auth"
                fontSize="sm"
                defaultValue={form.target_audience}
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Total audience youre targeting"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
            </div>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
            <div>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Start Form<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  {...register("start_date")}
                  isRequired={true}
                  fontSize="sm"
                  defaultValue={form.start_date}
                  mb="24px"
                  size="lg"
                  type="datetime-local"
                  variant="auth"
                />
              </InputGroup>
            </div>
            <div>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                End in<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  {...register("end_date")}
                  isRequired={true}
                  fontSize="sm"
                  mb="24px"
                  size="lg"
                  
                  type={"datetime-local"}
                  variant="auth"
                />
              </InputGroup>
            </div>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
            <div>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Security<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Switch
                  {...register("usePassword")}
                  defaultChecked={form.password ? true : false}
                  onChange={(e) => {
                    setUsePassword(e.target.checked);
                  }}
                />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
              </InputGroup>

              <InputGroup size="md">
                <Input
                  isRequired={true}
                  {...register("password")}
                  fontSize="sm"
                  defaultValue={form.password}
                  placeholder="Min. 8 characters"
                  disabled={!usePassword}
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
            </div>
            <div>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Audience Type<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Switch />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Dosen
                </FormLabel>
              </InputGroup>
              <InputGroup size="md">
                <Switch />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Mahasiswa
                </FormLabel>
              </InputGroup>
              <InputGroup size="md">
                <Switch />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Pegawai
                </FormLabel>
              </InputGroup>
              <Text>The selected type will be allowed to fill this form</Text>
            </div>
          </SimpleGrid>
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Your Form Link
          </FormLabel>

          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              placeholder=""
              ref={formLinkRef}
              disabled
              mb="24px"
              size="lg"
              type={"text"}
              value={form.public_id}
              variant="auth"
            />
            <InputRightElement display="flex" alignItems="center" mt="4px">
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: "pointer" }}
                as={CopyIcon}
                onClick={(e) => copyToClipboard(e)}
              />
            </InputRightElement>
          </InputGroup>

          <Button isLoading={updateFormState.loading} type="submit">
            Simpan
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
}

function FormInputUI(props: { [x: string]: any }) {
  const brandStars = useColorModeValue("brand.500", "brand.400");
  return (
    <div>
      <FormLabel
        display="flex"
        ms="4px"
        fontSize="sm"
        fontWeight="500"
        color={props.color}
        mb="8px"
      >
        Title<Text color={brandStars}>*</Text>
      </FormLabel>
      <Input
        isRequired={true}
        defaultValue={props.form.title}
        fontSize="sm"
        ms={{ base: "0px", md: "0px" }}
        type="text"
        placeholder="Title"
        mb="24px"
        fontWeight="500"
        size="lg"
        {...props}
      />
      <FormErrorMessage>
        {props.errors && props.errors.message}
      </FormErrorMessage>
    </div>
  );
}
