import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface Props {
  placeholder: string
  page: number;
  reset: boolean,
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder, onQuery, reset }: Props) => {
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
    if (reset) {
      setQuery('');
    }
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
          className="text-[#fafafa] w-full"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}>
        </Input>
        <Button variant="secondary"
          onClick={handleSearch}
        >Buscar</Button>
      </div>
    </>
  )
}
