import AdminLayout from "layouts/admin";
import { Route, Routes } from "react-router-dom";
import CreateForm from "views/admin/createForm/CreateForm";
import Dashboard from "views/admin/dashboard";
import FormDetail from "views/admin/formDetail/FormDetail";
import FormsPage from "views/admin/forms/Form";
import SignIn from "views/auth/signIn";
import NotFoundPage from "views/error/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/forms/:id" element={<FormDetail />} />
          <Route path="/forms/create" element={<CreateForm />} />
          {/* <Route path="/customers/:customerId" element={<CustomerEdit />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductEdit />} />
          <Route path="/orders" element={<BlankPage />} />
          <Route path="/analytics" element={<BlankPage />} />
          <Route path="/discount" element={<BlankPage />} />
          <Route path="/inventory" element={<BlankPage />} /> */}
        </Route>

        <Route path="/auth">
          <Route path="/auth/login" index element={<SignIn />} />
          <Route path="/auth/register" element={<SignIn />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
