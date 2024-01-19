import { act, fireEvent, render, screen } from "@testing-library/react";
import AddTagsInput from ".";
import { useState } from "react";
import Tag from "@/components/Tag";
import { X } from "lucide-react";

function AddTagsSimulationComponent() {
  const [tags, setTags] = useState<string[]>(["lorem", "ipsum"]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");

  return (
    <>
      <AddTagsInput
        inputOnChange={(e) => setCurrentTag(e.target.value)}
        inputValue={currentTag}
        tags={tags}
        clickOnTagAction={(tag: string) => {
          const aux = tags;
          aux.push(tag);
          setTags(aux);
        }}
        addButtonAction={() => {
          const aux = tags;
          aux.push(currentTag);
          setTags(aux);
        }}
      />
      <ul className={"flex flex-wrap items-start space-x-2"}>
        {selectedTags.map((elem) => {
          return (
            <li key={elem}>
              <Tag
                type="button"
                value={elem}
                aria-label="remove tag"
                clickAction={() => {
                  // @ts-ignore
                  const aux = selectedTags.filter((tag) => tag != elem);
                  setTags(aux);
                }}
              >
                {elem}
                <X size={14} />
              </Tag>
            </li>
          );
        })}
      </ul>
    </>
  );
}

test("simulation input add tag", async () => {
  const { container } = render(<AddTagsSimulationComponent />);
  const newTag = "new tag 2";
  const inputAddTags = screen.getByTestId("input-add-tags");
  const button = screen.getByTestId("input-add-tags-button");
  await act(async () => {
    fireEvent.change(inputAddTags, { target: { value: newTag } });
    fireEvent.click(button);
  });
  expect(container).toMatchSnapshot();
  expect(inputAddTags).toBeInTheDocument();
});
