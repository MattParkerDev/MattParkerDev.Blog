I recently watched a recording of a presentation given by Robert C. Martin, more affectionately known as Uncle Bob, titled **Expecting Professionalism**.

The summary on his [website](http://cleancoder.com/products) reads:

> In this talk, Uncle Bob transports you into an alternate reality where he is your new CTO. This is what he expects from you.
> As you listen, notice how reasonable these expectations are to customers and users. Notice also how impossible they appear to programmers.

This is a brilliant talk and I recommend watching it when you have time. [YouTube](https://www.youtube.com/watch?v=BSaAMQVq01E) (6:00 - 1:13:40)

Robert makes 15 important points which every programmer should consider, which I hope to distill concisely.

From this point on, **I am your CTO** and these are my **expectations of you**.

#### 1. Don't Ship #@!%

We will not ship #@!%.

```csharp
public void Ship(string code)
{
    if (code is not "#@!%")
    {
        // Ship it!
    }
}
```

We will not, as a matter of ethics, knowingly ship code that is defective or substandard.

This is not something you need to ask your boss - "Is it okay if I don't ship #@!% today?". As software developers, we are hired as professionals in our field - we are the experts. This is expected of you, and it is a hill you must die on.

We must not violate this rule to meet deadlines or pressure from business.

#### 2. Always be ready

Consider the typical 2 week sprint. What is supposed to be done every 2 weeks? What should the status of your work be? `❌ Done` `✅ Deployable`.
That does not necessarily mean you will deploy it, but that you and the team are satisfied that the code you have produced is **deployable**.

> **Code should always be deployable**

At the end of every sprint, you will always be ready.

#### 3. Stable Productivity

Consider a greenfield project - how fast can you write code? 🔥💻 Business asks for a feature, you tell them it will take a week. A week later, all done.

Fast forward a year, and it now takes 6 months to produce a new feature.

This is unacceptable - you must produce features just as fast a year from now, as you did today. You will not slow down based on a mess you made, because you will not make the mess.

> **We will not go fast if that will cause us to go slow later.**

#### 4. Inexpensive Adaptability

The software ought to be easy to change. The business should not find it expensive to adapt the system to new requirements.

We are writing software, not hardware.

✅ **Soft**ware ➡ soft ➡ easy to change.

❌ **Hard**ware ➡ hard ➡ hard to change.

#### 5. Continuous Improvement

I expect that the code gets cleaner with time, that designs improve with time.

Every system should be getting better, not worse.

> **Boyscout rule: every time you check in a module, you check it in cleaner than you checked it out.**

#### 6. Fearless Competence

You must not fear your code.

If you fear it, you cannot clean it. If you cannot clean it, it rots.  
It is extremely irresponsible to have lost control of the thing we created, to the extent that we fear any action towards it.

If only there was a big button I could push after changing code that lights up green 🟢 if the code isn't broken, and I could be confident checking in changes. Well there is - **unit testing!**

What is the right level of code test coverage? 100% is the only reasonable answer, but it is also unachievable. You will never get to 100%. But we are used to asymptotic goals! Keep pushing to get the number higher. By increasing that number, you get closer to trusting the green light when you push the button.

> **Systems that don't have tests, weren't designed to be tested**

#### 7. Extreme Quality

With that green light, extreme quality is expected.

I expect that the sofware is going to work consistently release after release. I don't expect lots of problems and crashes and data corruption. Perhaps the occasional bug once in a while, but when they do occur, I expect them to be tracked down quickly to be resolved appropriately.

Nowadays companies use software like JIRA to keep track of bugs. You may have a hundred or more bugs in your backlog, and this has become the norm.

We should not have many bugs.

#### 8. QA will find nothing

I expect that QA will find nothing - we will not dump bugs on QA.

How did we come to expect it to be a good thing for QA to find defects?
How do you evaluate how good a job QA is doing? They find more bugs! So now we've made bugs a good thing!

Developers absolutely should be unit testing and manually testing any new features or code changes they produce, before merging changes and handing it over to QA.

> If the code doesn't have to work, I can meet any deadline you set for me

#### 9. The majority of tests should be automated

The inevitable outcome of manual testing, is that corner's will be cut, and not all of the software will be tested.

> The inevitable outcome of manual testing is that you will **lose the tests**

We are programmers after all - we write code! Why wouldn't we have written tests that test every business rule in the system?

> Manual testing is more expensive than writing tests

Of course there are exceptions to this rule - there will always be cases where it is too expensive or not worth the time to write automated tests compared to manual testing.

#### 10. Nothing Fragile

Think about the current project you're working on; there will always be a module that you are never surprised by when it breaks.

> No part of the system should be fragile

#### 11. Cover for each other

You're on a project, and you're the database guy. That is your domain, and everyone else comes to you if they need changes made. If you're off the project for a day for whatever reason, no work on the database is done that day! ❌

It is your responsibility to make sure someone can cover for you if you are suddenly unavailable. ✅

#### 12. Honest Estimates

What is the best estimate?

**I don't know** is the most honest answer you can give! But we can do slightly better...

There are two components to an estimate - the accuracy and the precision. _I don't know_ is the right precision, but that estimate is not **accurate**.

I want 3 numbers - the best case, the expected case and the worst case.

> If everything goes right, I might be able to get it done by Wednesday. But it rarely does, so probably Friday. But if all hells breaks loose, probably next Friday.

This answer is honest in both accuracy and precision.

#### 13. You have to say 'No'

We have a responsibility to communicate to our company or our client, 'No'.

Consider software that is launched prematurely, and failed spectacularly - occurring countless times in history. Certainly there were programmers who knew that turning it on was a terrible idea.

When we as programmers are faced with these situations, we **must** say No!

#### 14. Continuous Aggressive Learning

The career software developer must ride the waves of new programming languages, frameworks, architectures and design patterns 🌊.

We should be learning new things constantly - our role is consistently changing, likely in ways we cannot anticipate. Take the recent ChatGPT for example! A programmer who buries their head in the sand and ignores GitHub Copilot will be left behind.

It is not your employer's responsibility for your career.

#### 15. Mentoring

How many programmers are there in the world?

In 1948, there were ~5 programmers in the world.

In 1955 - 1,000s.

1965 - 100,000s.

Since 1975, the number of programmers in the world has ~ doubled every 5 years.

When Bob gave his talk (2015), there were 100,000,000 programmers in the world.

> **Half the programmers in the world have less than 5 years experience.**

This puts our industry in a state of perpetual inexperience.

> It doesn't take a lot of intelligence to produce code, but it takes a lot of intelligence and experience to product
> well structured systems with **discipline**

Discipline must be instilled in the constant stream of new programmers.

### Retro

Uncle Bob distills so many gems from his 50 years of experience as a programmer.

My biggest takeaways from Robert's presentation of equal importance:

- Don't Ship #@!%
- Continuous Improvement
- Stable Productivity
- Fearless Competence
- Continuous Aggressive Learning

Which requirement do you think is the most important? Are there any you hadn't considered before?
Let me know on [Twitter](https://twitter.com/MattParkerDev), [Threads](https://www.threads.net/@mattparkerdev), or in the comments below! 😊
