import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { AdminLogin } from "./AdminLogin";
import { AdminRoute } from "./AdminRoute";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminEducation } from "./pages/AdminEducation";
import { AdminExperience } from "./pages/AdminExperience";
import { AdminProjects } from "./pages/AdminProjects";
import { AdminSkills } from "./pages/AdminSkills";

export const AdminApp = () => (
  <Routes>
    <Route path="login" element={<AdminLogin />} />
    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projetos" element={<AdminProjects />} />
        <Route path="experiencia" element={<AdminExperience />} />
        <Route path="educacao" element={<AdminEducation />} />
        <Route path="skills" element={<AdminSkills />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>
);
