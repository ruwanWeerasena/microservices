using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Features.Orders.Commands.UpdateOrder;

public class UpdateOrderCommandValidator : AbstractValidator<UpdateOrderCommand>
{
    public UpdateOrderCommandValidator()
    {
        RuleFor(p => p.Id).NotEmpty()
                          .NotNull()
                          .WithMessage("Id is required");

        RuleFor(p => p.UserName).NotEmpty()
                               .WithMessage("Username is required")
                               .NotNull()
                               .MaximumLength(50)
                               .WithMessage("Username must not exceed 50 characters");

        RuleFor(p => p.EmailAddress).NotEmpty()
                                    .WithMessage("Email is Required");

        RuleFor(p => p.TotalPrice).NotEmpty()
                                  .WithMessage("Total Price is Required")
                                  .GreaterThan(0)
                                  .WithMessage("Total Price should be greater than 0");
    }
}
