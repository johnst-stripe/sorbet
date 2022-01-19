#include <map>
#include <ruby_parser/token.hh>

using namespace ruby_parser;

token::token(token_type type, size_t start, size_t end, std::string_view str)
    : _start(start), _type(type), _size(clamp_size(end - start)), _string(str) {}

token_type token::type() const {
    return _type;
}

size_t token::start() const {
    return _start;
}

size_t token::end() const {
    return _start + _size;
}

std::string_view token::view() const {
    return _string;
}

std::string token::asString() const {
    return std::string(_string);
}
