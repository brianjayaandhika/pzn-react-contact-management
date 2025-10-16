import { useNavigate } from "react-router";
import { MdGroups } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { confirmAlert, errorAlert } from "../helpers/AlertHelper";
import Pagination from "../components/Pagination";
import SearchContact from "../components/contact/SearchContact";
import CreateContactCard from "../components/contact/CreateContactCard";
import ContactCard from "../components/contact/ContactCard";
import { DeleteContact, SearchContacts } from "@/lib/api/contact/contact.api";

export default function DashboardContactPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [searchedPagination, setSearchedPagination] = useState([]);
  const [searchedContacts, setSearchedContacts] = useState(contacts);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(0);
  const size = 5;

  const paginationRender = useMemo(() => {
    return isSearching ? searchedPagination : pagination;
  }, [isSearching, searchedPagination, pagination]);

  const listToRender = useMemo(() => {
    const render = isSearching ? searchedContacts : contacts;
    console.log(render);
    console.log(isSearching);
    return render;
  }, [isSearching, searchedContacts, contacts]);

  async function fetchContact(name = null, email = null, phone = null) {
    if (name || email || phone) {
      setIsSearching(true);
    }

    const response = await SearchContacts({
      name: name && name,
      email: email && email,
      phone: phone && phone,
      page,
      size,
    });

    if (response.data) {
      if (!name && !email && !phone) {
        setContacts(response.data);
        setPagination(response.paging);
      } else {
        setSearchedContacts(response.data);
        setSearchedPagination(response.paging);
      }
    } else {
      await errorAlert(
        `Failed to fetch: ${response.errors || "Something went wrong"}`
      );
    }
  }

  function handleClear() {
    setIsSearching(false);
    setSearchedContacts([]);
  }

  function handleNavigate(path) {
    navigate(path);
  }

  async function handleDelete(contact) {
    await confirmAlert({
      message: `Delete ${contact.firstName} ${contact.lastName} from contacts?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      cbConfirmText: "Delete Successful",
      cbConfirm: async () => {
        const response = await DeleteContact(contact.id);

        if (response.data) {
          await fetchContact();
        }
      },
    });
  }

  useEffect(() => {
    fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="w-full min-h-screen h-full px-32 flex flex-col gap-6 relative mt-20 scroll-smooth">
      <span className="text-blue-400 text-3xl flex gap-3 items-center">
        <MdGroups />
        <p className="text-white font-bold text-xl">My Contacts</p>
      </span>
      <SearchContact handleSearch={fetchContact} handleClear={handleClear} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateContactCard />
        {listToRender.length < 1 ? (
          <div>Empty Contacts...</div>
        ) : (
          listToRender.map((contact) => (
            <ContactCard
              handleClick={(e) => {
                e.stopPropagation();
                handleNavigate(`/dashboard/contact/${contact.id}`);
              }}
              handleEdit={() =>
                handleNavigate(`/dashboard/edit_contact/${contact.id}`)
              }
              handleDelete={() => handleDelete(contact)}
              firstName={contact.firstName}
              lastName={contact.lastName}
              email={contact.email}
              phone={contact.phone}
              key={contact.id}
            />
          ))
        )}
      </div>
      <Pagination pagination={paginationRender} setPage={setPage} page={page} />
    </div>
  );
}
