import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const payload = await req.json();

  // Only handle Clerk's user.created event
  if (payload.type !== "user.created") {
    return new Response("Ignored event", { status: 200 });
  }

  const { id, email_addresses, first_name, last_name } = payload.data;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // Service role key for full DB rights
  );

  const { error } = await supabase.from("users").insert({
    clerk_id: id,
    email: email_addresses[0]?.email_address,
    first_name,
    last_name,
  });

  if (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
