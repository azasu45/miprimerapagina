import { createClient } from "@supabase/supabase-js";
import "../css/index.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_ANON
);

let { data: tast_table } = await supabase
  .from("cuentas")
  .select(
    `
  *,
  asientos(*)
`
  )
  .ilike("nombre", "%banca%")
  .order("fechaCreado", { foreignTable: "asientos", ascending: false });

console.log(tast_table);

//https://jfqzxmgcfpengxewvwfa.supabase.co/rest/v1/cuentas?select=*,asientos(*)&asientos.order=fechaCreado.desc
