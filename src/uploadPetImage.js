import { supabase } from "../supabase";

export async function uploadPetImage(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `pets/${fileName}`;

  const { error } = await supabase.storage
    .from("pets")
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("pets")
    .getPublicUrl(filePath);

  return data.publicUrl;
}