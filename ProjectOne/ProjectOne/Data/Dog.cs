using System;
namespace ProjectOne.Data
{
    public class Dog
    {
        public Dog(string breed,uint age, string size)
        {
            Breed = breed;
            Age = age;
            Size = size;
            
        }
        public string Breed { get; }
        public uint Age { get; }
        public string Size { get; }
    }
}

