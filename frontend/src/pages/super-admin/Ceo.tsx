import CeosTable from "../../components/super-admin/CeosTable"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"


const Ceo = () => {
  return (
    <div>
       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ceo's Management</h1>
          <p className="text-blue-100">Manage and track all ceo's</p>
        </div>

        <div>
          <Link to='add-ceo' className="flex items-center gap-2 mt-4 bg-white text-blue-600 py-2 px-4 rounded-lg font-medium">
            <Plus className="w-6 h-6" />
            Add New CEO
          </Link>
        </div>
      </div>
      <CeosTable/>
    </div>
  )
}

export default Ceo
