import { useMutation } from "@apollo/client";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router";
import { FORM_QUERIES } from "services/apollo/Operations/Client/Queries";

export default function CreateFormButton() {
  // External
  const toast = useToast();
  const navigate = useNavigate();

  const [createForm, { data, loading, error }] = useMutation<{
    insert_forms_one: { id: string };
  }>(FORM_QUERIES.createEmptyForm,  {
    variables: {
      created_by: "a96fdcb2-4c4d-49a9-a227-dad5512fc60a",
      title: "Untitled",
    },
  });

  useEffect(() => {
    if (data) {
      toast({
        title: "Success",
        description: "Form created successfully",
        status: "success",
        duration: 1000,
      });
      setTimeout(() => {
        navigate(`/forms/${data.insert_forms_one.id}`);
      }, 1000);
    } else if (error) {
      toast({
        title: "Failed",
        description: error.message,
        status: "error",
        duration: 1000,
      });
    }
  }, [data, error]);

  return (
    <Button
      variant="darkBrand"
      color="white"
      fontSize="sm"
      fontWeight="500"
      isLoading={loading}
      onClick={() => createForm()}
      borderRadius="70px"
      leftIcon={<Icon transition="0.2s linear" w="20px" h="20px" as={IoAdd} />}
      px="24px"
      py="5px"
    >
      Buat Form Baru
    </Button>
  );
}
