export async function GET(req: Request, { params }: { params: { roverId: string } }) {
  const { roverId } = await params;

  if (!roverId) {
    console.error("roverId is required");
    return new Response(
      JSON.stringify({ error: "roverId is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log(`Fetching data for rover: ${roverId}`);

  try {
    const res = await fetch(`https://fleetbots-production.up.railway.app/api/rovers/${roverId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch data for rover: ${roverId}. Status: ${res.status}`);
      return new Response(
        JSON.stringify({ error: `Failed to fetch rover data for ${roverId}` }),
        { status: res.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();

    if (!data || data.error) {
      console.error(`Error fetching rover data: ${data?.error || 'Unknown error'}`);
      return new Response(
        JSON.stringify({ error: "Failed to retrieve valid data" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data from Python backend:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
