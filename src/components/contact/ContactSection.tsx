import { MdGroups } from "react-icons/md";
import PageTitle from "../PageTitle";
import SearchContact from "./SearchContact";
import CreateContactCard from "./CreateContactCard";
import { confirmAlert, errorAlert } from "@/helpers/AlertHelper";
import { DeleteContact, SearchContacts } from "@/lib/api/contact/contact.api";
import { Contact } from "@/lib/api/contact/contact.types";
import { Paging } from "@/lib/api/http/http.types";
import { useEffect, useMemo, useState } from "react";
import ContactCard from "./ContactCard";
import Pagination from "../Pagination";

export default function ContactSection({
  handleNavigate,
}: {
  handleNavigate: (path: string) => void;
}) {
  const size = 5;
  const [page, setPage] = useState<number>(0);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [pagination, setPagination] = useState<Paging | null>(null);
  const [searchedContacts, setSearchedContacts] = useState<Contact[] | null>(
    contacts
  );
  const [searchedPagination, setSearchedPagination] = useState<Paging | null>(
    null
  );
  const [isSearching, setIsSearching] = useState<boolean>(false);

  async function fetchContact(name?: string, email?: string, phone?: string) {
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

    if (response.data && response.paging) {
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

  const paginationRender = useMemo(() => {
    return isSearching ? searchedPagination : pagination;
  }, [isSearching, searchedPagination, pagination]);

  const listToRender = useMemo(() => {
    return isSearching ? searchedContacts : contacts;
  }, [isSearching, searchedContacts, contacts]);

  async function handleDelete(contact: Contact) {
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

  function handleClear() {
    setIsSearching(false);
    setSearchedContacts([]);
  }

  useEffect(() => {
    fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="w-full min-h-screen h-full px-32 flex flex-col gap-6 relative scroll-smooth">
      <PageTitle title="My Contacts" IconComponent={MdGroups} />
      <SearchContact handleSearch={fetchContact} handleClear={handleClear} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateContactCard />
        {listToRender && listToRender.length < 1 ? (
          <div>Empty Contacts...</div>
        ) : (
          listToRender &&
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
      <Pagination
        pagination={paginationRender!}
        setPage={setPage}
        page={page}
      />
    </div>
  );
}
