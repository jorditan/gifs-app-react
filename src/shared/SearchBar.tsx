import { useEffect, useState } from "react";
import { CustomDropdownMenu } from "./CustomDropdownMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface Props {
  placeholder: string
  page: number;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder, onQuery, page }: Props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query)
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    }

  }, [query, onQuery])

  const handleSearch = () => {
    onQuery(query);
    setQuery('');
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <>
      <div className="search-container flex gap-3 pb-5">
        <Input type="text"
          className="text-[#fafafa] w-1/4"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}>
        </Input>
        <Button variant="secondary"
          onClick={handleSearch}
        >Buscar</Button>
        <CustomDropdownMenu buttonText={`Límite: ${page}`} items={[5, 10, 15, 20, 30, 40]} />
      </div>
    </>
  )
}
