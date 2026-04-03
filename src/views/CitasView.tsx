import { useQueryClient } from "@tanstack/react-query"

const CitasView = () => {

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['user']);
  console.log(data);
  return (
    <div>
      Citas
    </div>
  )
}

export default CitasView
