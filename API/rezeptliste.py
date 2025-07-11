from datasets import load_dataset
ds = load_dataset("corbt/all-recipes")

for i in range(1000000):
    text = ds['train'][i]['input']
    ingredients_start = text.find("Ingredients:")
    if ingredients_start != -1:
        header = text[:ingredients_start].strip()
        first_line_end = header.find("\n")
        if first_line_end != -1:
            recipe_name = header[:first_line_end].strip()
        else:
            recipe_name = header
    else:
        recipe_name = "Kein Name gefunden"
    
    print(f"Rezept {i+1}: {recipe_name}")
