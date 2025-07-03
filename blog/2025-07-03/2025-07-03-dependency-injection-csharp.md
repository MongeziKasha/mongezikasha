---
slug: dependency-injection-csharp
title: Understanding Dependency Injection in C#
authors: [mongezikasha]
tags: [csharp, dependency-injection]
---

# Understanding Dependency Injection in C#

Dependency Injection (DI) is a design pattern that implements Inversion of Control (IoC) for resolving dependencies. Let me walk you through the core concepts and implementation in C#.

<!-- truncate -->

## What is Dependency Injection?

Dependency Injection is a technique where one object supplies the dependencies of another object. A dependency is an object that can be used by another object. An injection is the passing of a dependency to a dependent object that would use it.

The main advantages of using DI include:

- **Decoupling**: Reduces the dependency between classes
- **Testability**: Makes unit testing easier with mock objects
- **Maintainability**: Code becomes more modular and easier to maintain
- **Extensibility**: Makes it easier to extend the application

## Types of Dependency Injection in C#

There are three common types of DI:

### 1. Constructor Injection

This is the most common type of DI where dependencies are provided through a class constructor.

```csharp
public class OrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly ILogger _logger;

    // Dependencies injected via constructor
    public OrderService(IOrderRepository orderRepository, ILogger logger)
    {
        _orderRepository = orderRepository;
        _logger = logger;
    }

    public void CreateOrder(Order order)
    {
        _logger.LogInformation("Creating an order");
        _orderRepository.Save(order);
    }
}
```

### 2. Property Injection

Dependencies are provided through public properties.

```csharp
public class OrderService
{
    // Dependencies injected via properties
    public IOrderRepository OrderRepository { get; set; }
    public ILogger Logger { get; set; }

    public void CreateOrder(Order order)
    {
        Logger.LogInformation("Creating an order");
        OrderRepository.Save(order);
    }
}
```

### 3. Method Injection

Dependencies are provided through method parameters.

```csharp
public class OrderService
{
    public void CreateOrder(Order order, IOrderRepository orderRepository, ILogger logger)
    {
        logger.LogInformation("Creating an order");
        orderRepository.Save(order);
    }
}
```

## DI Containers in C#

.NET Core and .NET 5+ come with a built-in DI container that makes it easy to implement DI in your applications. Here's how to set it up in a typical ASP.NET Core application:

```csharp
// In Startup.cs or Program.cs
public void ConfigureServices(IServiceCollection services)
{
    // Register services with different lifetimes
    services.AddTransient<IOrderService, OrderService>();
    services.AddScoped<IOrderRepository, OrderRepository>();
    services.AddSingleton<ILogger, ConsoleLogger>();
}
```

### Service Lifetimes

When registering services, you need to specify their lifetime:

1. **Transient**: Created each time they're requested
2. **Scoped**: Created once per client request (in a web application)
3. **Singleton**: Created once and used throughout the application's lifetime

## Real-world Example

Here's a complete example showing how to implement DI in a simple console application:

```csharp
using Microsoft.Extensions.DependencyInjection;
using System;

// Interfaces
public interface INotificationService
{
    void SendNotification(string message);
}

public interface IUserService
{
    void RegisterUser(string username);
}

// Implementations
public class EmailNotificationService : INotificationService
{
    public void SendNotification(string message)
    {
        Console.WriteLine($"Sending email: {message}");
    }
}

public class UserService : IUserService
{
    private readonly INotificationService _notificationService;

    public UserService(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    public void RegisterUser(string username)
    {
        Console.WriteLine($"Registering user: {username}");
        _notificationService.SendNotification($"Welcome, {username}!");
    }
}

// Application
class Program
{
    static void Main(string[] args)
    {
        // Setup DI
        var serviceProvider = new ServiceCollection()
            .AddSingleton<INotificationService, EmailNotificationService>()
            .AddTransient<IUserService, UserService>()
            .BuildServiceProvider();

        // Resolve and use services
        var userService = serviceProvider.GetService<IUserService>();
        userService.RegisterUser("Mongezi");
    }
}
```

## Benefits of Using DI in Your C# Applications

1. **Loose coupling**: Components are independent and can be developed, tested, and maintained separately
2. **Testability**: Easy to substitute real implementations with mocks or stubs during testing
3. **Flexibility**: Changing implementations becomes easier without modifying client code
4. **Code reusability**: Promotes the creation of reusable components
5. **Maintainability**: Makes the codebase more modular and easier to maintain

## Best Practices

1. Favor constructor injection over other types
2. Keep your containers configured in one place
3. Only inject what you need
4. Use interfaces for injected dependencies
5. Understand the different lifetimes and their implications

## Conclusion

Dependency Injection is a powerful pattern that helps you write cleaner, more modular, and testable code. In the modern C# ecosystem, with built-in DI support in frameworks like ASP.NET Core, implementing DI has become straightforward and should be considered a standard practice for most applications.

By embracing DI, you'll create applications that are easier to extend, test, and maintain over time.
