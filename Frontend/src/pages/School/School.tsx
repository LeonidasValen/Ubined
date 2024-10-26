import { Filter } from "./components/Filter/Filter"
import { Search } from "../../components/Search/Search";
import { ListSchool } from "./ListSchool/ListSchool";
import './school.css'

export function School() {
  return (
    <main className="schoolsContainer">
      <div className="listContainer">
        <Filter/>
        <section className="listSchool">
          <Search/>
          <div className="listSchools">
            <ListSchool />
          </div>
        </section>
      </div>
    </main>
  )
}
