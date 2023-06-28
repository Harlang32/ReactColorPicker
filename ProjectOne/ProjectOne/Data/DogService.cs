using System;
namespace ProjectOne.Data
{
    public class DogService
    {
        public DogService()
        {
        }
        public Dog[] GetDogs()
        {
            Dog lab = new("lab", 1, "small");
            Dog aussie = new("aussie", 2, "medium");
            Dog husky = new("husky", 5, "big");

            return new Dog[] { lab,aussie,husky };
        }
    }
}

